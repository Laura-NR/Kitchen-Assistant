export class ZeroWasteService {
    constructor(zeroWasteDAO) {
        this.zeroWasteDAO = zeroWasteDAO;
    }

    async getTips(keyword) {
        if (!keyword) {
            return this.zeroWasteDAO.getAllTips();
        }
        return this.zeroWasteDAO.getTipsByKeyword(keyword);
    }

    async addTip(tipData) {
        return this.zeroWasteDAO.addTip(
            tipData.keyword,
            tipData.suggestion,
            tipData.category
        );
    }
}
