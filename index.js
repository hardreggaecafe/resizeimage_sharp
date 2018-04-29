'use strict';

const aws = require('aws-sdk');
const sharp = require('sharp');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });


exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    // Get the object from the event and show its content type
    const filename = event.path.replace(/^\//, "");
    const bucket = 'some_bucket';
    const width = event.queryStringParameters.w;
    console.log("file="+filename+" bucket="+bucket + " w="+width);
    const params = {
        Bucket: bucket,
        Key: 'images/' +filename
    };
    s3.getObject(params, (err, data) => {
        if (err) {
            console.log(err);
            var message = "Error getting object " + filename + " from bucket " + bucket +
                ". Make sure they exist and your bucket is in the same region as this function.";
            console.log(message);
            context.fail(message);
        } else {
            var contentType = data.ContentType;
            var extension = contentType.split('/').pop();
            
            sharp(data.Body)
                        .rotate()
                        .resize(parseInt(width, 10))
                        .withMetadata()
                        .toBuffer(function(err, stdout, stderr) {
                if(err) {
                    context.fail(err);
                    return;
                }
                var contentType;
                if ( filename.endsWith('jpg') || filename.endsWith('jpeg') ){
                  contentType = "image/jpeg";
                } else if ( filename.endsWith('png') ){
                  contentType = "image/png";
                } else if ( filename.endsWith('gif')) {
                  contentType = "image/gif";
                }
                callback(null, {
                    "isBase64Encoded": true,
                    "statusCode": 200,
                    "headers": { "Content-Type": contentType },
                    "body": new Buffer(stdout, 'binary').toString('base64')
                });
            });
        }
    });
};

