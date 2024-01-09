import Home from '../views/home'
import Center from '../views/center/index'
import AddUser from '../views/user/addUser'
import UserList from '../views/user/userList'
import AddShopUser from '../views/shopUser/addShopUser.vue'
import ShopUserList from '../views/shopUser/shopUserList.vue'
import ShopUserManage from '../views/shopUser/shopUserManage.vue'
import AddShop from '../views/shop/addShop.vue'
import AddShopCategory from '../views/shop/addShopCategory.vue'
import ShopList from '../views/shop/shopList.vue'
import ShopManage from '../views/shop/shopManage.vue'
const configRouters = [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/center',
    component: Center,
  },
  {
    path: '/addUser',
    component: AddUser,
  },
  {
    path: '/userList',
    component: UserList,
  },
  {
    path: '/addShopUser',
    component: AddShopUser,
  },
  {
    path: '/shopUserList',
    component: ShopUserList,
  },
  {
    path: '/shopUserManage',
    component: ShopUserManage,
  },
  {
    path: '/addShop',
    component: AddShop,
  },
  {
    path: '/addShopCategory',
    component: AddShopCategory,
  },
  {
    path: '/shopList',
    component: ShopList,
  },
  {
    path: '/shopManage',
    component: ShopManage,
  },
]

export default configRouters
