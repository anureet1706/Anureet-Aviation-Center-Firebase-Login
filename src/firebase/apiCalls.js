import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, get, set, push, remove, update } from 'firebase/database';
import { db, storage  } from "./firebaseConfig";

export async function getProducts() {
  const rentalRef = databaseRef(db, "products/");
  const rentalSnapShot = await get(rentalRef);
  return Object.values(rentalSnapShot.val());
};


export async function deleteProduct(key){
    const rentalRef = databaseRef(db, `products/${key}`)
  
    rentalRef.remove()
};


export async function addProduct(product, file) {
    // paths to the data to write
    const imageRef = storageRef(storage, `images/${file.name}`);
    const dataRef =  databaseRef(db, 'products')
console.log(imageRef)
    // uploading file to the storage bucket
    const uploadResult = await uploadBytes(imageRef, file);
    // url to the image stored in storage bucket
    const urlPath =  await getDownloadURL(imageRef) 
    console.log(urlPath)
    // path on the storage bucket to the image
    const storagePath = uploadResult.metadata.fullPath;

    // firebase unique key
    const itemRef = await push(dataRef)
    
    set(itemRef,{
      key: itemRef.key,
       sku:`jhvr${itemRef.key}`,
       urlPath,
       storagePath,
       title: product.title,
       price: product.price,
       model: product.model
    });
  
};

export async function editProduct(product, file) {
 // paths to the data to write
 const imageRef =     storageRef( storage, `images/${file.name}`);
 const dataRef =  databaseRef( db, 'products')

 // uploading file to the storage bucket
 const uploadResult = await uploadBytes(imageRef, file);
 // url to the image stored in storage bucket
 const urlPath =  await getDownloadURL(imageRef) 
 // path on the storage bucket to the image
 const storagePath = uploadResult.metadata.fullPath;

 // firebase unique key
 const itemRef = await push(dataRef)

const postData = {
  key: itemRef.key,
  sku:`jhvr${itemRef.key}`,
  urlPath: urlPath,
  storagePath,
  title: product.title,
  price: product.price,
  model: product.model
}


update(databaseRef(db), postData);
  
};