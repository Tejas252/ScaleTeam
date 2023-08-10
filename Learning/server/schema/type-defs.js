const {gql} = require("apollo-server")

const typeDefs   = gql`

    type user{
        id:ID
        firstName:String!
        lastName:String!
        maidenName:String!
        age:Int!
        gender:String!
        email:String!
        phone:Int!
        username:String!
        password:String!
        birthDate:String!
        image:String!
    }

    type Query{
        users:[user!]!
    }

`

module.exports = {typeDefs}