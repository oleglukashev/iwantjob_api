const https = require('https');
const pool = require('./pgconnection');

exports.run = () => {
  https.get('https://remoteok.io/api', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      collectJobs(JSON.parse(data));
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
};

collectJobs = (json) => {
  pool.query(`SELECT url FROM jobs`, (err, res) => {
    if (!err) {
      const jobs_items = json.filter((item) => {
        return item.position != null;
      });

      const exist_urls = res.rows.map(row => row.url);

      jobs_items.forEach((item) => {
        if (!exist_urls.includes(item.url)) {
          pool.query({
            text: 'INSERT INTO jobs (title, description, url) values ($1, $2, $3)',
            values: [item.position, item.description, item.url]
          }, () => {
            exist_urls.push(item.url);
          });
        }
      });
    }
  });
}
