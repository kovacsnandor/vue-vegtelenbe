<template>
  <div class="mt-5">
		
    <h3>Kategóriák</h3>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <router-link :to="{name: 'blog'}">Összes</router-link>
      </li>
      <li class="list-group-item" v-for="(category, index) in categoryCollection" :key="index">
        <router-link :to="{name: 'blogCategory', params: {categoryName: category}}">{{category}}</router-link>
        <!-- <router-link :to="'blog/category' + category">{{category}}</router-link> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["postCollection"],
  computed: {
		//Milyen kategórianevek vannak
    categoryCollection() {
      //mindenből csak egy látszódjon (ismétlés elnyomása)
      const categories = this.postCollection.map((post) => {
        return post.category;
      });
      return categories.filter((category, index) => {
        return categories.indexOf(category) == index;
      });
    },
  },
  methods: {
    OnCategoryClick(category) {
      if (category) {
        this.$emit("categoryChange", category);
      } else {
        this.$emit("categoryChange");
      }
    },
  },
};
</script>