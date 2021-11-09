<template>
  <div class="category-menu-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-lg-3 col-xl-3 col-sm-12 col-12" id="category">
          <div class="sidebar-filter-wrapper">
            <ul>
              <li>
                <p class="filter-title text-dark"><span>Related Category</span></p>
              </li>
              <li v-for="category in categoryList" :key="category.id">
                <a href="#" @click.prevent="changeURL(category.slug)"
                   :class="category.id === category_id?'font-weight-bold':''">
                  {{ category.name }}
                </a>
                <ul v-if="category.id === category_id">
                  <li v-for="subcategories in subcategory_list" :key="subcategories.id">
                    <a href="/"
                       :class="subcategories.id === subcategory_id?'font-weight-bold':''"
                       @click.prevent="changeURL(categoryNameById(category_id).slug, subcategories.slug)">
                      {{ subcategories.name }}
                    </a>
                    <ul v-if="subcategories.id === subcategory_id">
                      <li v-for="sub_subcategories in sub_subcategory_list" :key="sub_subcategories.id">
                        <a href="/"
                           @click.prevent="changeURL(categoryNameById(category_id).slug, subcategories.slug,sub_subcategories.slug )"
                           :class="sub_subcategories.id === sub_subcategory_id?'font-weight-bold':''">
                          {{ sub_subcategories.name }}
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <ul v-for="(attribute, k) in attribute_option" :key="k">
              <li>
                <p class="filter-title text-dark"><span>{{ attribute.label }}</span></p>
              </li>
              <li>
                <a-checkbox-group style="display: grid" v-model="attribute.value" :options="attribute.data"/>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-12 col-lg-9 col-xl-9 col-sm-12 col-12 mt-3">
          <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
            <div class="container d-flex align-items-center">
              <a-breadcrumb>
                <a-breadcrumb-item v-if="category_id !== ''">
                  <router-link :to="{name: 'category', params: { cat: categoryNameById(category_id).slug }}">
                    {{ categoryNameById(category_id).name }}
                  </router-link>
                  <a-menu slot="overlay" v-if="child_position !== 1">
                    <a-menu-item v-for="category in categoryList" :key="category.id">
                      <a href="#" @click.prevent="changeURL(category.slug)">
                        {{ category.name }}
                      </a>
                    </a-menu-item>
                  </a-menu>
                </a-breadcrumb-item>
                <a-breadcrumb-item v-if="subcategory_id !== ''">
                  <router-link
                      :to="{name: 'category', params: { cat: categoryNameById(category_id).slug, sub: subcategoryNameById(subcategory_id).slug, }}">
                    {{ subcategoryNameById(subcategory_id).name }}
                  </router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item v-if="sub_subcategory_id !== ''">
                  {{ subsubcategoryNameById(sub_subcategory_id).name }}
                </a-breadcrumb-item>
                <a-breadcrumb-item>({{ product_list.length }} Results)</a-breadcrumb-item>
              </a-breadcrumb>
            </div>
          </nav>
          <div class="product-list-wrapper">
            <div class="top-filter">
              <div class="product-type">

              </div>
              <div class="filters">
                <div class="filter-item mr-3">
                  <span class="filter-label">Sort by</span>
                  <select class="form-control" id="" title="Sort by">
                    <option>New items</option>
                    <option value="1">Price - high to low</option>
                    <option value="2">Price - low to high</option>
                    <option value="3">Old items</option>
                  </select>
                </div>
                <div class="filter-item">
                  <span class="filter-label">Items per page</span>
                  <select class="form-control" id="" title="Items per page">
                    <option value="1">25</option>
                    <option value="2">50</option>
                    <option value="3">100</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="product-item-categoryHeader">
            <hr class="first">
            <div class="name" v-if="category_id !== '' && child_position === 1">{{
                categoryNameById(category_id).name
              }}
            </div>
            <div class="name" v-if="subcategory_id !== '' && child_position === 2">
              {{ subcategoryNameById(subcategory_id).name }}
            </div>
            <div class="name" v-if="sub_subcategory_id !== '' && child_position === 3">
              {{ subsubcategoryNameById(sub_subcategory_id).name }}
            </div>
            <hr class="last">
          </div>
          <a-row :gutter="10">
            <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="product-detail-section mt-4"
                   v-for="(products, k) in product_list" :key="k">
              <Product :products="products" style="height: 308px!important;"/>
            </a-col>
          </a-row>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ApiService from "@/core/services/api.service";
import Product from "@/components/helper/Product";

export default {
  name: "ProductList",
  components: {Product},
  data() {
    return {
      attribute_option: [],
      category_list: [],
      category_id: '',
      subcategory_id: '',
      sub_subcategory_id: '',
      subcategory_list: [],
      sub_subcategory_list: [],
      child_id: '',
      child_position: 0,
      product_list: [],
      keyword: '',
    }
  },
  methods: {
    changeURL(category = false, subcategory = false, subsubcategory = false) {
      let param = '';
      let query = {};
      if (category) param += '/' + category;
      if (subcategory) param += '/' + subcategory;
      if (subsubcategory) param += '/' + subsubcategory;
      if (this.keyword !== '') query.pro = this.keyword;

      this.$router.push({path: `/category${param}`, query: query});
    },
    loadChild() {
      if (this.$route.params.subcat) {
        this.child_position = 3;
      } else {
        if (this.$route.params.sub) {
          this.child_position = 2;
        } else {
          if (this.$route.params.cat) {
            this.child_position = 1;
          }
        }
      }
    },
    loadCategory() {
      if (this.$route.params.cat) {
        if (this.categoryList.length > 0) {
          let category = this.categoryNameBySlug(this.$route.params.cat);
          if (category) {
            this.category_id = category.id;
            this.child_position === 1 ? this.child_id = category.id : '';
          } else this.$router.push({name: "error-404"});
        }
      } else {
        if (this.categoryList.length > 0) {
          this.category_list = this.categoryList;
          this.child_position = 0;
          this.loadProduct();
        }
      }
    },
    loadSubcategory() {
      if (this.category_id !== '' && this.subcategoryList.length > 0) {
        this.subcategory_list = this.subcategoryById(this.category_id);
        if (this.$route.params.sub) {
          let subcategory = this.subcategoryNameBySlug(this.$route.params.sub);
          if (subcategory) {
            this.subcategory_id = subcategory.id;
            this.child_position === 2 ? this.child_id = subcategory.id : '';
          } else this.$router.push({name: "error-404"});
        }
      }
    },
    loadSubSubcategory() {
      if (this.subcategory_id !== '' && this.subsubcategoryList.length > 0) {
        this.sub_subcategory_list = this.subsubcategoryById(this.subcategory_id);
        if (this.$route.params.subcat) {
          let sub_subcategory = this.subsubcategoryNameBySlug(this.$route.params.subcat);
          if (sub_subcategory) {
            this.sub_subcategory_id = sub_subcategory.id;
            this.child_position === 3 ? this.child_id = sub_subcategory.id : '';
          } else this.$router.push({name: "error-404"});
        }
      }
    },
    loadAttribute() {
      if (this.attributeList.length > 0) {
        this.attribute_option = [];
        let attribute = this.attributeById({position: this.child_position, id: this.child_id})
        for (let i = 0; i < attribute.length; i++) {
          if (attribute[i].value.length > 0) {
            this.attribute_option.unshift({
              label: attribute[i].name,
              data: attribute[i].value,
              value: [],
            });
          }
        }
      }
    },
    loadProduct() {
      let url = '';
      if (this.child_position === 1) url += 'category=' + this.child_id;
      if (this.child_position === 2) url += 'subcategory=' + this.child_id;
      if (this.child_position === 3) url += 'subsubcategory=' + this.child_id;
      url = 'product-listing?' + url;
      ApiService.get(url)
          .then(({data}) => {
            this.product_list = data.product_details;
          })
    },
  },
  created() {
    if (this.$route.query.pro) this.keyword = this.$route.query.pro;
    this.loadChild();
    if (!this.categoryList.length > 0) this.$store.dispatch('CATEGORY_LIST');
    if (!this.subcategoryList.length > 0) this.$store.dispatch('SUBCATEGORY_LIST');
    if (!this.subsubcategoryList.length > 0) this.$store.dispatch('SUBSUBCATEGORY_LIST');
    if (!this.attributeList.length > 0) this.$store.dispatch('ATTRIBUTE_LIST');
    this.loadCategory();
  },
  computed: {
    ...mapGetters(["categoryList", "subcategoryList", "subsubcategoryList", "attributeList", "subcategoryById", "subsubcategoryById", "categoryNameBySlug",
      "subcategoryNameBySlug", "subsubcategoryNameBySlug", "categoryNameById", "subcategoryNameById", "subsubcategoryNameById", "attributeById"])
  },
  watch: {
    attributeList() {
      this.loadAttribute();
    },
    categoryList() {
      this.loadCategory();
    },
    subcategoryList() {
      this.loadSubcategory();
    },
    category_id() {
      this.loadSubcategory();
    },
    subsubcategoryList() {
      this.loadSubSubcategory();
    },
    subcategory_id() {
      this.loadSubSubcategory();
    },
    child_id() {
      this.loadAttribute();
      this.loadProduct();
    },
    '$route.query.pro'() {

    }
  }
}
</script>

<style scoped>
.sidebar-filter-wrapper ul li a {
  color: #6e6a80;
  font-size: 13px;
}

.sidebar-filter-wrapper ul li a:hover {
  text-decoration: underline;
}

.sidebar-filter-wrapper ul ul {
  margin: 0;
  padding: 3px 5px;
  list-style: none;
}

.sidebar-filter-wrapper ul ul li {
  position: relative;
}

.sidebar-filter-wrapper ul ul li::before {
  content: '- ';
  color: #6e6a80;
}
.sidebar-filter-wrapper ul ul ul li::before {
  content: '-- ';
  color: #6e6a80;
}
</style>
