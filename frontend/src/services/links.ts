import { LinksState } from "../components/context/link";
import HttpService, { IHttpInstance } from "../utils/network/http";

class LinkService {
  APIv1: IHttpInstance;

  constructor() {
    this.APIv1 = new HttpService("");
  }

  async getSecureLink() {
    const link = await this.APIv1.http.get("private-link");

    return link.data;
  }

  async createLink(data: LinksState) {
    const link = await this.APIv1.http.post("link", JSON.stringify(data));

    return link.data;
  }
}

export default new LinkService();
