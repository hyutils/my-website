import React from 'react'

export default function ScrollorGetList() {
  const scrollContainer = document.querySelector('.scroll-container');
  const list = document.querySelector('.list');
  let page = 1;

  scrollContainer?.addEventListener('scroll', () => {
    const scrollHeight = scrollContainer.scrollHeight;
    const scrollTop = scrollContainer.scrollTop;
    const clientHeight = scrollContainer.clientHeight;

    if (scrollTop === 0) {
      // Reached the top of the scroll container, load previous data
      loadPreviousData();
    }

    if (scrollTop + clientHeight >= scrollHeight) {
      // Reached the bottom of the scroll container, load more data
      loadMoreData();
    }
  });

  function loadPreviousData() {
    // Simulate loading previous data (e.g., from an API)
    const previousData = fetchPreviousDataFromServer();

    // Prepend previous data to the list
    previousData.reverse().forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      list?.prepend(listItem);
    });

    page--;
  }

  function loadMoreData() {
    // Simulate loading new data (e.g., from an API)
    const newData = fetchMoreDataFromServer();

    // Append new data to the list
    newData.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      list?.appendChild(listItem);
    });

    page++;
  }

  function fetchPreviousDataFromServer() {
    // Simulated function to fetch previous data from the server
    const dataPerPage = 10;
    const previousData = [];

    // Generate some sample data
    for (let i = dataPerPage; i > 0; i--) {
      const item = `Item ${(page - 1) * dataPerPage - i}`;
      previousData.push(item);
    }

    return previousData;
  }

  function fetchMoreDataFromServer() {
    // Simulated function to fetch more data from the server
    const dataPerPage = 10;
    const newData = [];

    // Generate some sample data
    for (let i = 0; i < dataPerPage; i++) {
      const item = `Item ${page * dataPerPage + i}`;
      newData.push(item);
    }

    return newData;
  }
  
  return (
    <div>
      <div className="scroll-container" style={{ height: 400, overflow: 'auto' }}>
        <ul className="list"></ul>
      </div>
    </div>
  )
}
