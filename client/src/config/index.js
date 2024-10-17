export const registerFormControls = [
  {
    name: "name",
    label: "User Name",
    placeholder: "Enter Your User Name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    componentType: "input",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm Password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    componentType: "input",
    type: "password",
  },
];

export const userRoleOptions = [
  { id: "admin", label: "Admin" },
  { id: "user", label: "User" },
  { id: "super-admin", label: "Super Admin" },
];

export const userRoleMap = {
  admin: "Admin",
  user: "User",
  "super-admin": "Super Admin",
};

export const adddProductFormElements = [
  {
    label: "Product ID",
    name: "productId",
    componentType: "input",
    type: "text",
    placeholder: "Enter Product ID",
  },
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter Product Title",
  },
  // {
  //   label: "Description",
  //   name: "description",
  //   componentType: "textarea",
  //   placeholder: "Enter Product Description",
  // },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "bag", label: "Bag" },
      { id: "sunglass", label: "Sunglass" },
      { id: "bracelet", label: "Bracelet" },
      { id: "earring", label: "Earring" },
      { id: "hairband", label: "Hairband" },
      { id: "hariclip", label: "Hair Clip" },
      { id: "hairbow", label: "Hair Bow" },
      { id: "headband", label: "Headband" },
      { id: "socks", label: "Socks" },
    ],
  },
  // {
  //   label: "Brand",
  //   name: "brand",
  //   componentType: "select",
  //   options: [
  //     { id: "nike", label: "Nike" },
  //     { id: "adidas", label: "Adidas" },
  //     { id: "puma", label: "Puma" },
  //     { id: "reebok", label: "Reebok" },
  //     { id: "fila", label: "Fila" },
  //   ],
  // },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter Product Price",
  },
  {
    label: "Purchase Price",
    name: "purchasePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter Product Purchase Price",
  },
  {
    label: "Stock",
    name: "stock",
    componentType: "input",
    type: "number",
    placeholder: "Enter Product Stock",
  },
  {
    label: "Date",
    name: "date",
    componentType: "input",
    type: "date",
    placeholder: "Enter Product Date",
  },
];

export const addOrderFormElements = [
  {
    label: "Product ID",
    name: "productId",
    componentType: "input",
    type: "text",
    placeholder: "Enter Product ID",
  },
  {
    label: "Quantity",
    name: "quantity",
    componentType: "input",
    type: "number",
    placeholder: "Enter Quantity",
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter Unit Price",
  },
  {
    label: "Date",
    name: "date",
    componentType: "input",
    type: "date",
    placeholder: "Enter Date",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "contact",
    label: "Contact",
    path: "/shop/contact",
  },
  {
    id: "about",
    label: "About",
    path: "/shop/about",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  bag: "Bag",
  sunglass: "Sunglass",
  bracelet: "Bracelet",
  earring: "Earring",
  hairband: "Hairband",
  hariclip: "Hair Clip",
  hairbow: "Hair Bow",
  headband: "Headband",
  socks: "Socks",
  others: "Others",
};

// export const brandOptionsMap = {
//   nike: "Nike",
//   adidas: "Adidas",
//   puma: "Puma",
//   levi: "Levi",
//   zara: "Zara",
//   'h&m': "H&M",
// }

export const filterOptions = {
  category: [
    { id: "bag", label: "Bag" },
    { id: "sunglass", label: "Sunglass" },
    { id: "bracelet", label: "Bracelet" },
    { id: "earring", label: "Earring" },
    { id: "hairband", label: "Hairband" },
    { id: "hariclip", label: "Hair Clip" },
    { id: "hairbow", label: "Hair Bow" },
    { id: "headband", label: "Headband" },
    { id: "socks", label: "Socks" },
    { id: "others", label: "Others" },
  ],
  // brand: [
  //   { id: "nike", label: "Nike" },
  //   { id: "adidas", label: "Adidas" },
  //   { id: "puma", label: "Puma" },
  //   { id: "levi", label: "Levi" },
  //   { id: "zara", label: "Zara" },
  //   { id: "h&m", label: "H&M" },
  // ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price Low to High" },
  { id: "price-hightolow", label: "Price High to Low" },
  { id: "title-atoz", label: "Title A to Z" },
  { id: "title-ztoa", label: "Title Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
