// https://api.themoviedb.org/3/{endpoint}?api_key={YOUR_API_KEY}&language={LANGUAGE}

// Đảm bảo bạn đã có API Key từ TMDb
const API_KEY = 'e9b49d3e1cc7a3225b7760dcf18b6ba7'; // Thay bằng API Key của bạn
// Hàm chính để xử lý và hiển thị dữ liệu
(async () => {
  // Các API routes cho các loại phim khác nhau
  const HomeAPIRoutes = {
    "Trending Movies": { url: "/trending/movie/week" },
    "Popular Movies": { url: "/movie/popular" },
    "Top Rated Movies": { url: "/movie/top_rated" },
    "Now Playing at Theatres": { url: "/movie/now_playing" },
    "Upcoming Movies": { url: "/movie/upcoming" },
  };

  // Gọi API và lấy dữ liệu cho tất cả các loại phim
  const fetchMovieData = async (route) => {
    const response = await fetch(
      `https://api.themoviedb.org/3${route.url}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results; // Trả về dữ liệu phim từ API
  };

  // Tạo mảng các API routes
  const movieApiRoutes = Object.values(HomeAPIRoutes);

  // Lấy dữ liệu từ từng API và đợi tất cả các yêu cầu hoàn thành
  const allMovieData = [];
  for (let i = 0; i < movieApiRoutes.length; i++) {
    const route = movieApiRoutes[i];
    const movieData = await fetchMovieData(route);
    allMovieData.push(movieData); // Thêm dữ liệu phim vào mảng
  }
  // console.log(allMovieData)
  // Gắn kết quả vào một đối tượng với các danh mục phim
  const movieDataByCategory = {};
  const categories = Object.keys(HomeAPIRoutes);

  // Duyệt qua các danh mục và gán dữ liệu vào đúng danh mục
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    movieDataByCategory[category] = allMovieData[i];
  }

  // Lấy danh sách phim trending
  const trendingMovies = movieDataByCategory["Trending Movies"];

  // Chọn bộ phim ngẫu nhiên từ danh sách Trending Movies
  // const randomTrendingMovie = trendingMovies[new Date().getDate() % trendingMovies.length];

  const randomIndex = Math.floor(Math.random() * trendingMovies.length); // Tính chỉ số ngẫu nhiên
  const randomTrendingMovie = trendingMovies[randomIndex]; // Lấy bộ phim ngẫu nhiên từ mảng

  // Cập nhật Hero Section với thông tin của bộ phim ngẫu nhiên
  document.querySelector("#hero-img").src = `https://image.tmdb.org/t/p/original${randomTrendingMovie.backdrop_path}`;
  document.querySelector("#hero-img-preview").src = `https://image.tmdb.org/t/p/w300${randomTrendingMovie.poster_path}`;
  document.querySelector("#hero-title").innerText = randomTrendingMovie.title || randomTrendingMovie.name;
  document.querySelector("#hero-description").innerText = randomTrendingMovie.overview;
  document.querySelector("#watch-now-btn").href = `./watch.html?id=${randomTrendingMovie.id}`;
  document.querySelector("#view-info-btn").href = `./info.html?id=${randomTrendingMovie.id}`;

  // Hiển thị các danh mục phim trong phần main
  Object.keys(movieDataByCategory).forEach((category, index) => {
    const movieListHtml = movieDataByCategory[category]
      .map((movie) => {
        return `
          <a href="./info.html?id=${movie.id}" class="swiper-slide" style="width: 200px !important">
            <div class="movie-card">
              <img class="fade-in" onload="this.style.opacity = '1'" src="https://image.tmdb.org/t/p/w200${movie.poster_path}" />
              <p class="multiline-ellipsis-2">${movie.title || movie.name}</p>
            </div>
          </a>
        `;
      })
      .join("\n");

    // Thêm HTML của mỗi danh mục vào trang
    document.querySelector("main").innerHTML +=`
      <div class="section">
        <h2>${category}</h2>
        <div class="swiper-${index} swiper">
          <div class="swiper-wrapper">${movieListHtml}</div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    `;
  });

  // Khởi tạo Swiper cho mỗi danh mục phim
  Object.keys(movieDataByCategory).forEach((category, index) => {
    new Swiper(`.swiper-${index}`, {
      spaceBetween: 30,
      autoplay: { delay: 5000, disableOnInteraction: true },
      slidesPerView: "auto",
      loop: true,
      slidesPerGroupAuto: true,
      navigation: {
        prevEl: `.swiper-button-prev`,
        nextEl: `.swiper-button-next`,
      },
    });
  });
})();
