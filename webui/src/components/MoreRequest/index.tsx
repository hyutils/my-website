import React from "react";
async function concurrencyRequest(urls: string[], maxNum: number) {
  return new Promise((resolve) => {
    const results: any = [];
    const executing: any = [];
    const run = async (url: any) => {
      try {
        const response = await fetch(url);
        results.push(response);
        console.log("请求中", url);
      } catch (error) {
        results.push({ error: true, message: error.message });
      } finally {
        const index = executing.indexOf(url);
        if (index !== -1) {
          executing.splice(index, 1);
        }
      }

      if (urls.length > 0 && executing.length < maxNum) {
        const runUrl = urls.shift();
        run(runUrl);
        executing.push(runUrl);
      }
      if (urls.length === 0 && executing.length === 0) resolve(results);
    };

    // 初始化时，执行最多 maxNum 个请求
    for (let i = 0; i < Math.min(maxNum, urls.length); i++) {
      const url = urls.shift();
      run(url);
      executing.push(url);
    }
  });
}

const MyRequest = () => {
  // Example usage:
  const urls = ["url1", "url2", "url3", "url4", "url5", "url6", "url7", "url8"];
  const maxNum = 3;

  concurrencyRequest(urls, maxNum)
    .then((results) => {
      console.log("结果", results);
    })
    .catch((error) => {
      console.error("发生错误：", error);
    });
  return <div>hhhh</div>;
};

export default MyRequest;
