<template>
  <div>
    <!-- <div class="jumbotron jumbotron-fluid mb-0">
      <div class="container">
        <h1 class>Mennyit keresnék, ha...?</h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum fugiat sequi, placeat dolor
          aliquid porro a quisquam ut, accusantium quasi assumenda maiores ipsum vel.
        </p>
        <a class="btn btn-green btn-lg mt-3" href="#" role="button">Tovább a kérdőívekre!</a>
      </div>
    </div>-->

    <div class="container">
      <div class="row">
        <main class="col-12 col-md-9">
          <div class="row px-lg-5">
            <div class="card-deck my-5">
              <div class="row">
                <!-- cards -->
                <BlogPostCard v-for="post in postCollection" :post="post" :key="post.id"></BlogPostCard>
              </div>
            </div>

            <!-- <nav aria-label="Page navigation example" class="col-11 mt-5">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#">Előző</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">2</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">3</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">Következő</a>
                </li>
              </ul>
            </nav>-->
          </div>
        </main>

        <aside id="aside" class="col-12 col-md-3 mt-5">
          <!-- Search -->
          <form class="form-inline">
            <input
              class="form-control mr-sm-2 mb-2"
              type="search"
              placeholder="Search"
              aria-label="Keresés"
            />
            <button class="btn btn-sm btn-outline-success my-2 my-sm-0" type="submit">Keresés</button>
          </form>
          <!-- /Search -->

          <!-- Category -->
          <!-- <BlogPostCategories :postCollection="postCollection" @categoryChange="OnCategoryChange"></BlogPostCategories> -->
          <!-- /Category -->

          <div class="my-5">
            <h3 class="mb-3">Tags</h3>
            <a href="#" class="badge badge-primary badge-pill p-2 m-1">Informatika</a>
            <a href="#" class="badge badge-secondary badge-pill p-2 m-1">Marketing</a>
            <a href="#" class="badge badge-success badge-pill p-2 m-1">Oktatás</a>
            <a href="#" class="badge badge-danger badge-pill p-2 m-1">Művészet</a>
            <a href="#" class="badge badge-warning badge-pill p-2 m-1">Warning</a>
            <a href="#" class="badge badge-info badge-pill p-2 m-1">Info</a>
            <a href="#" class="badge badge-light badge-pill p-2 m-1">Light</a>
            <a href="#" class="badge badge-dark badge-pill p-2 m-1">Dark</a>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../DataService";
import BlogPostCard from "../components/BlogPostCard.vue";
import BlogPostCategories from "../components/BlogPostCategories.vue";
import { TYPES } from '../store';

export default {
  components: {
    BlogPostCard,
    BlogPostCategories,
  },
  data() {
    return {
      // postCollection: [],
      filters: {}
    };
  },
  created() {
		if(this.$store.getters.isLoggedIn){
			//azért kell return, mert meg kell hogy várja a then-t
			return this.$store.dispatch(TYPES.actions.loadPosts);
		}else{
			//Ha nem vagyunk belépve, akkor menjen a login oldalra
			this.$router.push({name: "login"});
		}
  },
  computed: {
		postCollection(){
			return this.$store.state.posts;
		},
    filteredPostCollection() {
      //Ha nincs ilyen, akkor nem szűrünk, tehát visszaadjuk az öszeset
      if (!this.$route.params.categoryName) {
        return this.postCollection;
      }

      return this.postCollection.filter((post) => {
        return post.category == this.$route.params.categoryName;
      });
    },
  },

  methods: {
    OnCategoryChange(newCategory) {
      //this.filters.category = newCategory
      if (newCategory) {
        //ha a data objektum, akkor csak így lehet új tulajdonsággal bővíteni, hogy automatikusan frissüljön
        this.$set(this.filters, "category", newCategory);
      } else {
        //Töröljük  a filters tuljadonságát
        this.$delete(this.filters, "category");
      }
    },
  },
};
</script>