/*import AWS from 'aws-sdk';

AWS.config.loadFromPath('aws.json');

var s3 = new AWS.S3({apiVersion: '2006-03-01'});

export default s3;*/


import { S3, S3Client, PutObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
//import aws from 'aws-sdk';

/*
aws.config.update({
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
    "region": process.env.AWS_REGION
});

let s3 = new aws.S3();
*/

let S3ClientInstance = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

export { S3ClientInstance, PutObjectCommand, DeleteObjectsCommand }

