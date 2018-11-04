class Order {
  constructor(code = '', label = '', price = '', amount = '') {
    this.code = code;
    this.label = label;
    this.price = price;
    this.amount = amount;
  }
}

new Vue ({
  el: '.container',
  
  data: {
    orders: [new Order('', '', '', '')],
    check: ''
  },
  
  computed: {
    result() {
      let toReturn = 0;
      
      for (let order of this.orders)
         toReturn += order.price * order.amount;
      
      return toReturn;
    },

    result2() {
      let toReturn = 0;
      
      for (let order of this.orders)
         toReturn += order.price * order.amount * 0.15;
      
      return toReturn;
    },
    password() {
      let toReturn = true
      if (this.check == 'че умный штоле?') 
        return toReturn
      
    }
    
  },
  
  methods: {
    addNewOrder() {
      this.orders.push(new Order);
    }
  }
});
