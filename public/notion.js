const { Client } = require("@notionhq/client");

const NOTION_KEY = "secret_o9i7RdJyj9jMoJvDXwQFLoxPDxsleyfLUiutxS9JKxZ";
const NOTION_PAGE_ID = "290458973c4e4d5e994c40f52e01b2d7";
// NOTION_PAGE_ID = "https://www.notion.so/ba084aa218ce416d8cef189d15712c69?v=250d0728ad8e4f01aaa8a7387567a93b";

const notion = new Client({ auth: NOTION_KEY });
const pageId = NOTION_PAGE_ID;

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { page_id: pageId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    console.log("Success! Entry added.");
  } catch (error) {
    console.error(error.body);
  }
}

// addItem("Yurts in Big Sur, California");

(async () => {
  const blockId = "2ab3be7bdb194cf48c9adf09868b4197";
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  //   console.log(response.results);

  for (const element in response.results) {
    const nadePageId = response.results[element].id;
    const childPage = response.results[element].child_page["title"];
    const hasChildren = response.results[element].has_children;
    // console.log(nadePageId, childPage, hasChildren);
    if (hasChildren === true) {
      const response2 = await notion.blocks.children.list({
        block_id: nadePageId,
        page_size: 50,
      });
      const pos = response2.results[0].callout["rich_text"][0]["plain_text"];
      const tags = response2.results[1].paragraph["rich_text"][0]["plain_text"];
      console.log(childPage, "|", pos, "|", tags);
      //   console.log(response2);
    }
  }
})();
