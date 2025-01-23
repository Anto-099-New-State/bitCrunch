import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://api.unleashnfts.com/api/v1/marketplaces',
  params: {
    currency: 'usd',
    metrics: 'sales',
    sort_by: 'holders',
    sort_order: 'desc',
    offset: '0',
    limit: '30',
    time_range: '24h',
    include_washtrade: 'true'
  },
  headers: {accept: 'application/json', 'x-api-key': 'a5f803529351e301a184a240bffc5fad'}
};

const NftCollections=()=>axios.request(options).then(res => console.log(res.data)).catch(err => console.error(err));

  export default (
    NftCollections
  );