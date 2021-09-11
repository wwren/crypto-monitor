export const getMarket = async function () {
  const rawData = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C14d"
  )
    .then((res) => res.json())
    .then((data) => data);
  const market = rawData
    .slice(0, 100)
    .map(
      ({
        id,
        name,
        image,
        current_price,
        market_cap,
        market_cap_rank,
        price_change_percentage_24h_in_currency,
        price_change_percentage_7d_in_currency,
        price_change_percentage_14d_in_currency,
      }) => ({
        key: id,
        id,
        name,
        image,
        current_price,
        market_cap,
        market_cap_rank,
        price_change_percentage_24h_in_currency,
        price_change_percentage_7d_in_currency,
        price_change_percentage_14d_in_currency,
      })
    );
  console.log("market data", market);

  const idList = rawData.slice(0, 100).map(({ id, name }) => ({
    key: id,
    name,
  }));

  console.log("idList", idList);
  return { market, idList };
};
