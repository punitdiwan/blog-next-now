import fetch from "isomorphic-unfetch";
import Link from "next/link";

HomePage.getInitialProps = async ({ req, query }) => {
  const protocol = req
    ? `${req.headers["x-forwarded-proto"]}:`
    : location.protocol;
  const host = req ? req.headers["x-forwarded-host"] : location.host;
  const pageRequest = `${protocol}//${host}/api/profiles?page=${query.page ||
    1}&limit=${query.limit || 9}`;
  const res = await fetch(pageRequest);
  const json = await res.json();
  return json;
};

function HomePage({ profiles, page, pageCount }) {
  return (
    <>
      <ul>
        {profiles.map(p => (
          <li className="profile" key={p.id}>
            <Link prefetch href={`/profile?id=${p.id}`}>
              <a>
                <img src={p.avatar} />
                <span>{p.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <nav>
        {page > 1 && (
          <Link prefetch href={`/?page=${page - 1}&limit=9`}>
            <a>Previous</a>
          </Link>
        )}
        {page < pageCount && (
          <Link prefetch href={`/?page=${page + 1}&limit=9`}>
            <a className="next">Next</a>
          </Link>
        )}
      </nav>
    </>
  );
}

export default HomePage;

// import Fetch from "isomorphic-unfetch";
// import Layout from "../components/Layout";

// import Prices from "../components/Prices";

// const Index = props => (
//   <Layout>
//     <div>
//       <h1>Welcome to Github Integration Testing.</h1>
//       <p>Check current Bitcoin rate</p>
//       <Prices bpi={props.bpi} />
//     </div>
//   </Layout>
// );

// Index.getInitialProps = async function() {
//   const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
//   const data = await res.json();

//   return {
//     bpi: data.bpi
//   };
// };

// export default Index;
