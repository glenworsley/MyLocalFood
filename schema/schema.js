const graphql = require('graphql');
const _= require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLFloat } = graphql;


//dummy data
var restaurants = [
    { name: 'Lucky Corner', cuisine: 'seafood', id: '1' },
    { name: 'Subway', cuisine: 'sandwich bar', id: '2' },
    { name: 'Crust Pizza', cuisine: 'pizza', id: '3' },
    { name: 'Pizza Bella', cuisine: 'pizza', id: '4' },
    { name: 'Mitcham Fish and Chips', cuisine: 'seafood', id: '5' }
];

const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        cuisine: { type: GraphQLString }
    })
});

const MenuItemType = new GraphQLObjectType({
    name: 'MenuItem',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        restaurant: {
            type: RestaurantType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                //code to get data from db
                console.log(typeof(args.id));
                return _.find(restaurants, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})