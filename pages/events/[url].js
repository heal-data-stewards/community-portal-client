import Layout from "@/components/layout";
import { getPageData, getGlobalData } from "utils/api";
import Seo from "@/components/elements/seo";
import axios from "axios";

const params = new URLSearchParams();

function Eventpage({ global, event, pageContext, metadata }) {
  // Render event page...
  return (
    <Layout
      global={global}
      pageContext={pageContext}
      style={{ background: "#9c2a6e08" }}
    >
      <Seo metadata={metadata} />
      <div className="container pt-10 pb-10">
        {/* Page header section */}
        <section>
          <h1 className="text-5xl font-black pb-8 text-gray-dark">
            {event.url}
          </h1>
          <p className="text-xl text-gray-dark">{event.url}</p>
        </section>
      </div>
    </Layout>
  );
}

params.append("client_id", process.env.CLIENT_ID);
params.append("scope", process.env.SCOPE);
params.append("client_secret", process.env.CLIENT_SECRET);
params.append("grant_type", process.env.GRANT_TYPE);

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

function getEvents(token) {
  axios
    .get(
      `https://graph.microsoft.com/v1.0/users/${process.env.USER_ID}/calendar/events`,
      params,
      {
        "Authorization": token,
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getAuthorizationToken() {
  axios
    .post(
      `https://login.microsoftonline.com/${process.env.MSFT_TENANT}/oauth2/v2.0/token`,
      params,
      headers
    )
    .then((res) => {
      console.log(res.data);
      // getEvents()
    })
    .catch((error) => {
      console.log(error);
    });
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts, the outlook endpoint here
  getAuthorizationToken();
  // const res = await fetch('')
  // const posts = await res.json()
  const dummyEndpoints = [{ url: "event1" }, { url: "event2" }];

  // Get the paths we want to pre-render based on posts
  const paths = dummyEndpoints.map((event) => ({
    params: { url: event.url },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps(context) {
  const { locale, locales, defaultLocale, preview = null } = context;
  // console.log(context)
  // params contains the event `url`.
  // If the route is like /event/1, then params.event is 1
  // const res = await fetch(`https://.../events/${params.url}`)
  // const event = await res.json()

  // Get the navbar and footer from strapi
  const globalLocale = await getGlobalData(locale);
  const params = { slug: ["calendar"] };
  const pageData = await getPageData({ slug: params.slug }, locale, preview);
  //   console.log("pageData")
  //   console.log(pageData)
  //   console.log("pageData")

  // We have the required page data, pass it to the page component
  const { metadata, localizations, slug } = pageData;

  const pageContext = {
    locale: pageData.locale,
    locales,
    defaultLocale,
    slug,
    localizations,
  };

  const event = { url: context.params.url, title: "event title example" };

  // Pass post data to the page via props
  return {
    props: {
      event,
      global: globalLocale,
      metadata,
      pageContext: {
        ...pageContext,
      },
    },
  };
}

export default Eventpage;
