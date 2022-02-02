var count = 0;
const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

const writeStream = fs.createWriteStream("questions.csv");
writeStream.write("Question,Link,Views,Votes,Answers\n");

let url = "https://stackoverflow.com/questions";
let questions = [];
producer(
  "https://stackoverflow.com/questions/40639432/what-is-the-best-way-to-limit-concurrency-when-using-es6s-promise-all"
);
async function producer(link) {
  console.log("Pre ORder of", count);
  let lnk = [];
  await request(link, (err, res, html) => {
    if (!err && res.statusCode == 200) {
      console.log("resp to aya");
      const $ = cheerio.load(html);
      let base = "https://stackoverflow.com";
      $(".related.js-gps-related-questions > div").each((i, ele) => {
        let asd = $(ele).find("a").attr("href");
        count++;
        lnk.push(base + asd);
      });
    }
  });
  let id = setInterval((lnk) => {
    helper(lnk);
  }, 1000);
  console.log("Post ORder of", count);
}

function helper(link) {
  request(link[0], (err, res, html) => {
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(html);
      let base = "https://stackoverflow.com";
      $(".related.js-gps-related-questions > div").each((i, ele) => {
        let asd = $(ele).find("a").attr("href");
        count++;
        console.log(asd);
      });
    }
  });
  request(link[1], (err, res, html) => {
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(html);
      let base = "https://stackoverflow.com";
      $(".related.js-gps-related-questions > div").each((i, ele) => {
        let asd = $(ele).find("a").attr("href");
        count++;
        console.log(asd);
      });
    }
  });
  request(link[2], (err, res, html) => {
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(html);
      let base = "https://stackoverflow.com";
      $(".related.js-gps-related-questions > div").each((i, ele) => {
        let asd = $(ele).find("a").attr("href");
        count++;
        console.log(asd);
      });
    }
  });
  request(link[3], (err, res, html) => {
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(html);
      let base = "https://stackoverflow.com";
      $(".related.js-gps-related-questions > div").each((i, ele) => {
        let asd = $(ele).find("a").attr("href");
        count++;
        console.log(asd);
      });
    }
  });
}

// request(url, (err, res, html) => {
//   if (!err && res.statusCode == 200) {
//     const $ = cheerio.load(html);
//     let base = "https://stackoverflow.com";
//     $(".question-summary").each((i, ele) => {
//       console.log(`${i + 1}`);
//       const qstn = $(ele)
//         .find(".summary>h3>a")
//         .text()
//         .replace(/\s\s+/g, "")
//         .replace(/,/, " ");
//       const views = $(ele)
//         .find(".statscontainer>.views")
//         .text()
//         .replace(/\s\s+/g, "");
//       const votes = $(ele)
//         .find(".stats>.vote>.votes>.vote-count-post")
//         .text()
//         .replace(/\s\s+/g, "");
//       const answers = $(ele)
//         .find(".stats>.status")
//         .text()
//         .replace(/\s\s+/g, "");
//       const link = base + $(ele).find(".summary>h3>a").attr("href");
//       questions.push({
//         question: qstn,
//         link: link,
//         votes: parseInt(votes),
//         views: parseInt(views),
//         answers: parseInt(answers),
//       });
//       //   writeStream.write(
//       //     `${qstn},${link},${parseInt(views)},${parseInt(votes)},${parseInt(
//       //       answers
//       //     )}\n`
//       //   );
//     });
//   }
// });
