let authors, books, magazines;
let titles = [];
let value;

const upload = document
  .getElementById("upload")
  .addEventListener("click", () => {
    Papa.parse(document.getElementById("uploadfile").files[0], {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        authors = results;
        console.log(authors.data);
      },
    });

    Papa.parse(document.getElementById("uploadfile").files[1], {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        books = results;
        console.log(books.data);
      },
    });

    Papa.parse(document.getElementById("uploadfile").files[2], {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        magazines = results;
        console.log(magazines.data);
      },
    });
    const bookAndMagazinesByIsbn = document
      .getElementById("findbook")
      .addEventListener("click", () => {
        console.log(
          "=> Books of the ISBN " + document.getElementById("ISBN").value
        );
        for (let i = 0; i < books.data.length; i++) {
          if (document.getElementById("ISBN").value === books.data[i].isbn) {
            console.log("   -" + books.data[i].title);
          }
        }

        console.log(
          "=> Magazines of the ISBN " + document.getElementById("ISBN").value
        );
        for (let i = 0; i < magazines.data.length; i++) {
          if (
            document.getElementById("ISBN").value === magazines.data[i].isbn
          ) {
            console.log("   -" + magazines.data[i].title);
          }
        }
      });

    const booksAndMagazinesByEmail = document
      .getElementById("findauthor")
      .addEventListener("click", () => {
        console.log(
          "=> Books of the author with email " +
            document.getElementById("email").value
        );
        for (let i = 0; i < books.data.length; i++) {
          if (
            document.getElementById("email").value === books.data[i].authors
          ) {
            console.log("   -" + books.data[i].title);
          }
        }

        console.log(
          "=> Magazines of the author with email " +
            document.getElementById("email").value
        );
        for (let i = 0; i < magazines.data.length; i++) {
          if (
            document.getElementById("email").value === magazines.data[i].authors
          ) {
            console.log("   -" + magazines.data[i].title);
          }
        }
      });

    const sortedTitles = document
      .getElementById("sorttitles")
      .addEventListener("click", () => {
        for (let i = 0; i < books.data.length; i++) {
          value = books.data[i].title;
          titles.push(value);
        }
        for (let i = 0; i < magazines.data.length; i++) {
          titles.push(magazines.data[i].title);
        }

        titles.sort();

        console.log("=> All the titles in sorted manner");
        for (let i = 0; i < titles.length; i++) {
          console.log("     -" + titles[i]);
        }
      });

    const addData = document
      .getElementById("adddata")
      .addEventListener("click", () => {
        let newDataBooks = {
          title: "And Then there were none",
          isbn: "5554-5546-4315",
          authors: "null-lieblich@echocat.org",
          description:
            "Considered the best mystery novel ever written by many readers, And Then There Were None is the story of ten strangers, each lured to Indian Island by a mysterious host. Once his guests have arrived, the host accuses each person of murder.",
        };
        books.data.push(newDataBooks);
        console.log("=> The new Books data Structure " + books.data);

        let csvDataBook = Papa.unparse({
          fields: ["title", "isbn", "authors", "description"],
          data: [
            [
              "And Then there were none",
              "5554-5546-4315",
              "null-lieblich@echocat.org",
              "Considered the best mystery novel ever written by many readers, And Then There Were None is the story of ten strangers, each lured to Indian Island by a mysterious host. Once his guests have arrived, the host accuses each person of murder.",
            ],
          ],
        });
        downloadCSVFile(csvDataBook);

        let newDataMagazines = {
          title: "The Times of India- The Rise of a New Star",
          isbn: "5554-5546-3396",
          authors: "The Editior",
          publishedAt: "21.05.2010",
        };

        magazines.data.push(newDataMagazines);
        console.log("=> The new Magazines data Structure " + magazines.data);

        let csvDataMagazine = Papa.unparse({
          fields: ["title", "isbn", "authors", "publishedAt"],
          data: [
            [
              "The Times of India- The Rise of a New Star",
              "5554-5546-3396",
              "The Editior",
              "21.05.2010",
            ],
          ],
        });

        downloadCSVFile(csvDataMagazine);
      });
  });

function downloadCSVFile(csv_data) {
  CSVFile = new Blob([csv_data], {
    type: "text/csv",
  });

  var temp_link = document.createElement("a");

  temp_link.download = "newData.csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  temp_link.click();
  document.body.removeChild(temp_link);
}
