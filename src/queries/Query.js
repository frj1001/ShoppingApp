import { client } from '..'
import { gql } from '@apollo/client'


export const get_currency = ()=> client.query({
        query: gql`
        query{
          currencies{
            label
            symbol
          }
        }`
      })
      .then(data => (data))

export const get_product = ()=> client.query({
        query: gql`
        query{
          category{
           products{
            category
             id
             name
             gallery
             prices{
               amount
             }
           }
         }
         }
        `
      })
      .then(data => (data))


