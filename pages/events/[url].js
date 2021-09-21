import Layout from "@/components/layout"
import { getPageData, getGlobalData } from "utils/api"

function Eventpage({ global, event, pageContext }) {
    // Render post...
    return (
        <Layout
        global={global}
        pageContext={pageContext}
        style={{ background: "#9c2a6e08" }}
      >
    
            <div className="container pt-10 pb-10">
              {/* Page header section */}
              <section>
                <h1 className="title mt-2 sm:mt-0 mb-4 sm:mb-2">{event.url}</h1>
                <p className="text-gray font-thin text-xl mt-2 sm:mt-0 mb-4 sm:mb-2">{event.url}</p>
              </section>
              {/* Events List */}

        </div>
        </Layout>
      )
  }


// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts, the outlook endpoint here
    // const res = await fetch('')
    // const posts = await res.json()
    const dummyEndpoints=[{url: "event1"}, {url:"event2"}]

  
    // Get the paths we want to pre-render based on posts
    const paths = dummyEndpoints.map((event) => ({
      params: { url: event.url},
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }

  // This also gets called at build time
export async function getStaticProps(context) {
    const { locale, locales, defaultLocale, preview = null } = context
    // console.log(context)
    // params contains the event `url`.
    // If the route is like /event/1, then params.event is 1
    // const res = await fetch(`https://.../events/${params.url}`)
    // const event = await res.json()
    
    // Get the navbar and footer from strapi
    const globalLocale = await getGlobalData(locale)
    const params = {slug: ["eventpage"]}
    const pageData = await getPageData(
        { slug: params.slug },
        locale,
        preview
      )
    //   console.log("pageData")
    //   console.log(pageData)
    //   console.log("pageData")

        // We have the required page data, pass it to the page component
  const { localizations, slug } = pageData

  const pageContext = {
    locale: pageData.locale,
    locales,
    defaultLocale,
    slug,
    localizations,
  }

    const event = {url: context.params.url, title: "event title example"}
  
    // Pass post data to the page via props
    return { props: { event, global: globalLocale, pageContext: {
        ...pageContext
      }, } }
  }

  export default Eventpage