// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { khmerLangSegmentInputSentence } from "../../lib/khmerLangUtil";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === "POST") {
    const query = req.body;
    try {
      const response = await khmerLangSegmentInputSentence({
        input: query.sentences,
      });
      res.statusCode = 200;
      res.json(response.data);
    } catch (e) {
      res.statusCode = 503;
      res.json({ error: "error Connecting KhmerLang to server" });
    }
  } else {
    res.statusCode = 404;
  }
};
