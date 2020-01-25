<template>
  <div>
    <Carousel :cards="cards" />
    <div class="section section--gray-gradient">
      <div class="container">
        <div class="section__header">
          <h1 class="section__heading">Online Photo Album</h1>
          <p class="section__subheading">
            Твой помощник в хранении и поиске фотографий
          </p>
        </div>
        <div class="section__content">
          <div class="features">
            <div class="feature">
              <img
                data-aos="fade-down"
                data-aos-duration="1000"
                src="../assets/icons/smartphone.svg"
                alt="feature-icon-smartphone"
                class="feature__icon"
              />
              <div class="feature__desc">
                <h3 class="feature__heading">Публикуй</h3>
                <p class="feature__text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Tempore repellendus illum debitis, culpa eius, voluptate
                  soluta saepe beatae autem adipisci vitae facilis nulla
                </p>
              </div>
            </div>
            <div class="feature">
              <img
                data-aos="fade-down"
                data-aos-delay="100"
                data-aos-duration="1000"
                src="../assets/icons/idea.svg"
                alt="feature-icon-idea"
                class="feature__icon"
              />
              <div class="feature__desc">
                <h3 class="feature__heading">Вдохновляйся</h3>
                <p class="feature__text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Tempore repellendus illum debitis, culpa eius, voluptate
                  soluta saepe beatae autem adipisci vitae facilis nulla
                </p>
              </div>
            </div>
            <div class="feature">
              <img
                data-aos="fade-down"
                data-aos-delay="200"
                data-aos-duration="1000"
                src="../assets/icons/heart.svg"
                alt="feature-icon-heart"
                class="feature__icon"
              />
              <div class="feature__desc">
                <h3 class="feature__heading">Оценивай</h3>
                <p class="feature__text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Tempore repellendus illum debitis, culpa eius, voluptate
                  soluta saepe beatae autem adipisci vitae facilis nulla
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="section__header">
          <h2 class="section__heading">
            Лучшие публикации
          </h2>
          <p class="section__subheading">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
        </div>
        <div class="section__content">
          <article class="post">
            <div
              class="post__image"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <img
                src="../assets/images/post-inspiration.jpg"
                alt="post-inspiration"
              />
            </div>
            <div class="post__desc">
              <div class="post__tag">Inspiration</div>
              <h3 class="post__heading">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h3>
              <p class="post__text">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                quam non nam alias, consequuntur voluptate perferendis quidem
                magni ullam deserunt saepe est aperiam amet adipisci veritatis?
                Aliquid fugit consequatur accusamus ipsam architecto repellat
                ducimus minus deleniti. Corporis neque, praesentium quae itaque
                officia consequuntur molestiae deleniti.
              </p>
            </div>
          </article>
          <article class="post post--reverse">
            <div
              class="post__image post__image--reverse"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <img
                src="../assets/images/post-technology.jpg"
                alt="post-technology"
              />
            </div>
            <div class="post__desc">
              <div class="post__tag">Technology</div>
              <h3 class="post__heading">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h3>
              <p class="post__text">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                quam non nam alias, consequuntur voluptate perferendis quidem
                magni ullam deserunt saepe est aperiam amet adipisci veritatis?
                Aliquid fugit consequatur accusamus ipsam architecto repellat
                ducimus minus deleniti. Corporis neque, praesentium quae itaque
                officia consequuntur molestiae deleniti.Animi, laborum esse
                doloremque pariatur modi nostrum culpa voluptatem aliquam
                placeat quo repellendus ea illo eveniet saepe facere deserunt
                maxime incidunt amet inventore. Deleniti laudantium suscipit
                natus maxime, excepturi eius voluptatibus culpa eligendi.
                Voluptate, eaque!
              </p>
            </div>
          </article>
          <article class="post">
            <div
              class="post__image"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <img
                src="../assets/images/post-volunteer.jpg"
                alt="post-volunteer"
              />
            </div>
            <div class="post__desc">
              <div class="post__tag">Volunteer</div>
              <h3 class="post__heading">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h3>
              <p class="post__text">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                quam non nam alias, consequuntur voluptate perferendis quidem
                magni ullam deserunt saepe est aperiam amet adipisci veritatis?
                Aliquid fugit consequatur accusamus ipsam architecto repellat
                ducimus minus deleniti.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
    <section class="section section--primary-color">
      <a id="registration"></a>
      <div class="container">
        <div class="section__header section__header--light">
          <h2 class="section__heading">Регистрируйся</h2>
          <p class="section__subheading">
            Скорее заполняй форму
          </p>
        </div>
        <div class="section__content">
          <div
            class="section__form"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <FormRegistration />
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <a id="login"></a>
      <div class="container">
        <div class="section__header">
          <h2 class="section__heading">Уже есть аккаунт?</h2>
          <p class="section__subheading">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
        </div>
        <div class="section__content">
          <div
            class="section__form"
            data-aos="zoom-out"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <FormLogin />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Carousel from "../components/CarouselBase";
import FormRegistration from "../components/form/FormRegistration";
import FormLogin from "../components/form/FormLogin";
import CarouselCardRegistration from "../components/CarouselCardRegister";

export default {
  name: "home",
  components: {
    Carousel,
    FormRegistration,
    FormLogin
  },
  data() {
    return {
      cards: [
        {
          imgName: "cards.jpg",
          heading: "Online Photo Album",
          subheading: "Тот, кто хранит твои воспоминания..."
        },
        {
          imgName: "woman-with-frame.jpg",
          heading: "Регистрируйся",
          subheading: "Заполни одну небольшую форму",
          content: CarouselCardRegistration
        },
        {
          imgName: "inspiration.jpg",
          heading: "Вдохновляйся",
          subheading: "Поделись творчеством с остальными"
        },
        {
          imgName: "likes.jpg",
          heading: "Оценивай чужие фотографии",
          subheading: "И получай лайки в ответ"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_home.scss";
</style>
