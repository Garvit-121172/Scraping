const cheerio = require("cheerio");
const request = require("request");
const Scrap = require("./scrap_model");
const fs = require("fs");
const dbConnection = require("./db");

dbConnection();
const writeStream = fs.createWriteStream("questions.csv");
writeStream.write("Question,Link,Views,Votes,Answers\n");

let link = ["/q/927358"];
let i = 0;
let base = "https://stackoverflow.com/";

setInterval(() => {
  helper();
}, 10000);
async function helper() {
  if (link.length >= 5)
    for (let i = 0; i < 5; i++) {
      await request(base + link[i], async (e, r, h) => {
        let $ = cheerio.load(h);
        let qstn = $("#question-header>h1").text();
        let href = $("#question-header>h1>a").attr("href");
        let upvotes = parseInt(
          $('[itemprop="upvoteCount"]').first().text().replace(/\s\s+/g, "")
        );
        let ans = parseInt(
          $('#answers-header .mb0 [itemprop="answerCount"]').text()
        );

        let views1;
        let views = $(".d-flex.fw-wrap.pb8.mb16.bb.bc-black-075")
          .children()
          .each((i, e) => {
            if (i == 2)
              views1 = parseInt(
                $(e).attr("title").replace("Viewed ", "").replace(",", "")
              );
          });
        await writeStream.write(
          `${qstn},${base + href},${views1},${upvotes},${ans}\n`
        );
        let newScrap = new Scrap({
          question: qstn,
          link: base + href,
          views: views1,
          votes: upvotes,
          answers: ans,
        });
        await newScrap.save();
        // console.log(href);
        // console.log(qstn);
        // console.log(views1);
        // console.log(upvotes);
        // console.log(ans);
      });
    }
  //   console.log("Before SLICE");
  //   console.log(link);
  //   link = link.slice(5);
  //   console.log("AFTER SLICE");
  //   console.log(link);
}

//PRODUCER:
setInterval(() => {
  producer(link[i]);
  i++;
}, 1000);

async function producer(path) {
  console.log(link);
  if (!!path) {
    console.log("On ", path);
    await request(base + path, (e, r, h) => {
      let $ = cheerio.load(h);

      $(".related.js-gps-related-questions .spacer")
        .children()
        .each((i, e) => {
          if (i % 2 == 0) {
            console.log("Inserting Related :", $(e).attr("href"));
            link.push($(e).attr("href"));
          }
        })
        .first()
        .attr("href");
    });
  }
}
