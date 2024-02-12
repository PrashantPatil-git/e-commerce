
class sellerService{
    //function for register seller
    register(values){
        console.log(values);
    }
    //function for login seller
    login(user){
        console.log(user);
    }
    getAllBooks(){

       return [
            { id: 1, title: 'Book 1', author: 'Author 1', price: 10, quantity: 5 },
            { id: 2, title: 'Book 2', author: 'Author 2', price: 15, quantity: 8 },
            { id: 3, title: 'Book 3', author: 'Author 3', price: 20, quantity: 3 },
          ];
    }
    deleteBook(id){

    }
}



export default new sellerService();