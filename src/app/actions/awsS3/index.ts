import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getSession } from "next-auth/react";
import crypto from "crypto"

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
type SignedURLResponse = Promise<
  | { failure?: undefined; success: { url: string } }
  | { failure: string; success?: undefined }
>;
interface SignedUrlResult {
    fileName: string;
    uploadUrl: string;
  }
export async function getSignedURL(): SignedURLResponse {
  const session = await getSession();
  if (!session) {
    return { failure: "not authenticated" };
  }

  const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")
  const signedUrl:SignedUrlResult[] =await Promise.all(
    Array.from({length:number},asyn(__,index)=>{
        
        const putObjectCommand = new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: generateFileName()
        });
      
        const url = await getSignedUrl(
          s3Client,
          putObjectCommand,
          { expiresIn: 60 } // 60 seconds
        );
      
      
      
      
      
        return { success: { url } };
    })

  )

    return signedUrl
}
