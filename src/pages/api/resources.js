import { getSecrets, NetlifySecrets } from '@netlify/functions';
import { v2 as cloudinary } from 'cloudinary';

export default async (req, res) => {
  const { folder } = JSON.parse(req.body)
  const secrets = await getSecrets(req);

  if ( !secrets.cloudinary?.bearerToken ) {
    return res.status(400).json({
      status: 'Failed to authenticate with Cloudinary'
    });
  }

  try {
    const { cloud_name } = await fetch('https://api.cloudinary.com/v1_1/token/info', {
      headers: {
        Authorization: `Bearer ${secrets.cloudinary.bearerToken}`
      }
    }).then(r => r.json());

    cloudinary.config({
      cloud_name,
      oauth_token: secrets.cloudinary.bearerToken
    });

    const resources = await cloudinary.search.expression(`folder=${folder}`).execute()

    return res.status(200).json({
      status: 'Ok',
      data: resources
    });
  } catch(e) {
    return res.status(400).json({
      status: e.message
    });
  }
}