import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type ACLtype = "private" | "public-read"

const conn = new S3Client({
    region: process.env.AWS_REGION,
    endpoint: `https://s3-${process.env.AWS_REGION}.amazonaws.com`,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

export const isFileExist = async (path: string) => {
    try {
        const checkFileExistsCommand = new HeadObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: path
        })
        await conn.send(checkFileExistsCommand)
        return true
    } catch (error) {
        return false
    }
}

export const downloadObject = async (path: string,  expiry: number = 60) => {
    const option = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: path,
    }
    const command = new GetObjectCommand(option)
    const url = await getSignedUrl(conn, command, {expiresIn: expiry})
    return url
}

export const uploadObject = async (path: string, type: string, acl: ACLtype = "private") => {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: path,
        ContentType: type,
        ACL: acl
    })
    const url = await getSignedUrl(conn, command, {expiresIn: 60})
    return url
}
