"use server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import prisma from "@/db";
import dotenv from "dotenv";
import { Prisma } from "@prisma/client";
dotenv.config();

//all types
const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "video/mp4",
  "video/quicktime",
];

const maxFileSize = 1048576 * 10; // 1 MB

type GetSignedURLParams = {
  fileType: string;
  fileSize: number;
  checksum: string;
};
interface SignedUrlResult {
  uploadUrl?: string;
  failure?: string;
}

//AWS S3 client connection
const s3Client =  new S3Client({
  region: process.env.AWS_BUCKET_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY! || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY! || "",
  },
});
//extract object key
const getobject = async (url: string) => {
  const object = new URL(url);

  const objectKey = object.pathname.substring(1); //Remove leading
  // console.log(objectKey);
  return objectKey;
};
//get signedURL function , with the help of we will taking signed url
export async function getSignedURL(
  numberOfFiles: number,
  fileType: string,
  serviceid: number
): Promise<SignedUrlResult> {
  //check user session
  // const session = await getSession();
  // if (!session) {
  //   return { failure: "not authenticated" };
  // }

  //check file type
  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" };
  }
    // console.log(process.env.AWS_ACCESS_KEY)
    // console.log(process.env.AWS_SECRET_ACCESS_KEY)
    // console.log(process.env.AWS_BUCKET_REGION)
  //function generate automatic file name
  const generateFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString(`hex`);

  const fileName = generateFileName();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
  });

  // console.log(s3Client);
  // console.log(putObjectCommand)
  try {
    const uploadUrl = await getSignedUrl(
      s3Client,
      putObjectCommand,
      { expiresIn: 60 } // 60 seconds
    );
    const objectkey = await getobject(uploadUrl); //extract object key
    // console.log(objectkey)
    //convert this into permanent URL
    const permanentURL = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${objectkey}`;
    console.log(permanentURL)
    const service = await prisma.services.findUnique({
      where: {
        id: serviceid,
      },
      select: {
        img: true,
      },
    });
    if (!service) {
      throw new Error(`Service with ID ${serviceid} not found`);
    }
    const existingImages : Prisma.JsonArray = [...(service.img as string[]), permanentURL]
   
    //update DB
    await prisma.services.update({
      where: {
        id: serviceid,
      },
      data: {
        img: existingImages,
      },
    });
    // console.log(permanentURL);
    // console.log(uploadUrl)
    return { uploadUrl };
  } catch (error) {
    console.error("Error generating signed URL:" + error);
    return { failure: "An error occurred while generating the signed URL" };
  }
}
