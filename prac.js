setTimeout(() => {
  console.log("hello");

  setTimeout(() => {
    console.log("hii");

    setTimeout(() => {
      console.log("byee");

      setTimeout(() => {
        console.log("assalam alaikum");
      }, 5);
    }, 10000);
  }, 10);
}, 10000);
