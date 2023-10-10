export const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 1500,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 4,
              infinite: false,
              dots: false
            }
        },
        {
            breakpoint: 1300,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 3,
              infinite: false,
              dots: false
            }
        },
        {
          breakpoint: 975,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: false
          }
        },
        {
          breakpoint: 950,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: false,
            dots: false
          }
        },
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        }
    ]
};