import { gql } from "@apollo/client";

export const TRENDING_COLLECTIONS = gql`
query TrendingCollections {
    trendingCollections(orderBy: SALES, orderDirection: DESC, timePeriod: ONE_HOUR ) {
        edges {
            node {
                address
                ... on ERC721Contract {
                    name
                    stats {
                        totalSales
                        average
                        ceiling
                        floor
                        volume
                    }
                    symbol
                }
            }
         }
    }
}
`
