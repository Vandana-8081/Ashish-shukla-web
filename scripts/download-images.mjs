import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const images = [
  // Hero
  {
    path: 'public/images/hero/hero-01.jpg',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80',
  },
  {
    path: 'public/images/hero/hero-02.jpg',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=80',
  },
  {
    path: 'public/images/hero/hero-03.jpg',
    url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1600&q=80',
  },

  // Profile
  {
    path: 'public/images/profile/ashish-shukla-profile.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85',
  },
  {
    path: 'public/images/profile/ashish-shukla-portrait.jpg',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85',
  },

  // Journey
  {
    path: 'public/images/journey/journey-01.jpg',
    url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/journey/journey-02.jpg',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/journey/journey-03.jpg',
    url: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80',
  },

  // Public Life
  {
    path: 'public/images/public-life/public-life-01.jpg',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/public-life/public-life-02.jpg',
    url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/public-life/public-life-03.jpg',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
  },

  // Development Priorities
  {
    path: 'public/images/development/healthcare.jpg',
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/development/roads.jpg',
    url: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/development/education.jpg',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/development/community.jpg',
    url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80',
  },

  // Updates
  {
    path: 'public/images/updates/update-01.jpg',
    url: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/updates/update-02.jpg',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/updates/update-03.jpg',
    url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/updates/update-04.jpg',
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/updates/update-05.jpg',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
  },

  // Media (Video thumbnails)
  {
    path: 'public/images/media/video-01.jpg',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/media/video-02.jpg',
    url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/media/video-03.jpg',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
  },

  // Gallery
  {
    path: 'public/images/gallery/gallery-01.jpg',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/gallery/gallery-02.jpg',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/gallery/gallery-03.jpg',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
  },
  {
    path: 'public/images/gallery/gallery-04.jpg',
    url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80',
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          file.close();
          return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        }
        if (response.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(`Status ${response.statusCode} for ${url}`));
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      })
      .on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function main() {
  console.log('Downloading high quality photographs...');
  for (const item of images) {
    try {
      await downloadFile(item.url, item.path);
      console.log(`Saved: ${item.path}`);
    } catch (err) {
      console.error(`Failed ${item.path}:`, err.message);
    }
  }

  // Ensure logo and icons directories exist
  fs.mkdirSync('public/logo', { recursive: true });
  fs.mkdirSync('public/icons', { recursive: true });

  console.log('Done downloading images.');
}

main();
