/*import AWS from 'aws-sdk';

AWS.config.loadFromPath('aws.json');

var s3 = new AWS.S3({apiVersion: '2006-03-01'});

export default s3;*/


import { S3, S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import aws from 'aws-sdk';

aws.config.update({
    "accessKeyId": process.env.AWS_ACCESS_KEY,
    "secretAccessKey": process.env.AWS_SECRET,
    "region": process.env.AWS_REGION
});

//let s3 = new S3Client({
//    "credentials": {
//        "accessKeyId": "AKIAJH32XZD6ZNNFCQHQ",
//        "secretAccessKey": "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",
//    },
//    "region": "us-west-1"
//});

let s3 = new aws.S3();

export { s3, PutObjectCommand }

