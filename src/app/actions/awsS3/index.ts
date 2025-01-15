import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getSession } from "next-auth/react";
import crypto from "crypto";
import { promises } from "dns";
import { prisma } from "@/db";
import { services } from "@/constants/service";

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

//AWS S3 client connection
const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

interface SignedUrlResult {
  fileName?: string;
  uploadUrl?: string;
  failure?: string;
}

//get signedURL function , with the help of we will taking signed url
export async function getSignedURL(
  numberOfFiles: number,
  fileType: string,
  serviceid: number
): Promise<SignedUrlResult[]> {
  //check user session
  const session = await getSession();
  if (!session) {
    return [{ failure: "not authenticated" }];
  }

  //check file type
  if (!allowedFileTypes.includes(fileType)) {
    return [{ failure: "File type not allowed" }];
  }

  //function generate automatic file name
  const generateFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString(`hex`);

  //signedURL function return array of object , used Array.from
  const signedUrl: SignedUrlResult[] = await Promise.all(
    //this function returning array of object .
    Array.from({ length: numberOfFiles }, async (__, index) => {
      //taking iterable  input
      const fileName = generateFileName();
      const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileName,
      });

      const url = await getSignedUrl(
        s3Client,
        putObjectCommand,
        { expiresIn: 60 } // 60 seconds
      );
      
      return { fileName, uploadUrl: url };
    })
  );
  //taking all image string url and converting into an array
  const imageurls: string[] = signedUrl
    .map((url) => url.uploadUrl)
    .filter((url): url is string => url !== undefined);

  //update DB
  await prisma.services.update({
    where: {
      id: serviceid,
    },
    data: {
      img: imageurls,
    },
  });

  return signedUrl;
}
