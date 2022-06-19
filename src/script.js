const addProduct_btn = document.getElementById("addProduct_btn");
const reload_btn = document.getElementById("reload_btn");
const modal_main = document.querySelector("#modal");
reload_btn.addEventListener("click", () => {
  fetch("http://localhost/sct/api/products/read.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderUser(data);
    });
});

loadCategory();
const renderUser = (users) => {
  let out = "";
  users.forEach((user) => {
    out += `
            <tr data-id=${user.id} data-cid=${user.p_category}>
                <td class="border border-slate-600" id="name_id" >${user.p_name}</td>
                <td class="border border-slate-600" id="detail_id" >${user.p_details}</td>
                <td class="border border-slate-600" id="price_id" >${user.p_price}</td>
                <td class="border border-slate-600" id="category_id" >${user.category_name}</td>
                <td class="border border-slate-600" id="category_id" ><img class="h-[100px] w-[100px]" src="img/${user.image}"></td>
                <td class="p-2 border border-slate-600 text-center"><a data-id=${user.id} id="id_delete" onclick="deleteUser(${user.id})">Delete</a></td>
                <td class="p-2 border border-slate-600 text-center"><a id="id_edit_${user.id}" onclick="editUser(${user.id})">Update</a></td>
                
            </tr>
            
            `;
  });

  output.innerHTML = out;
};
addProduct_btn.addEventListener("click", () => {
  modal_main.classList.remove("hidden");
});

//LOAD CATAGORY DATA
function loadCategory() {
  // fetch categories data
  fetch("http://localhost/sct/api/products/read_categories.php")
    .then((response) => response.json())
    .then((data) => renderCategory(data));
}
const renderCategory = (cats) => {
  cats.forEach((cat) => {
    const cat_id = document.createElement("option");
    cat_id.text = cat.name;
    cat_id.value = cat.id;
    p_category.appendChild(cat_id);
  });
};
function submitForm() {
  const formData = new FormData(document.getElementById("addForm_ID"));
  const value = Object.fromEntries(formData.entries());
  console.log(value);
  fetch("http://localhost/sct/api/products/create.php", {
    method: "POST",
    body: formData,
  });
}
