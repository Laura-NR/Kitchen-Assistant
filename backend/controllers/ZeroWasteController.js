export class ZeroWasteController {
    constructor(zeroWasteService) {
        this.zeroWasteService = zeroWasteService;
    }

    async getTips(req, res, next) {
        try {
            const tips = await this.zeroWasteService.getTips(req.query.keyword);
            res.json(tips);
        } catch (error) {
            next(error);
        }
    }

    async addTip(req, res, next) {
        try {
            const result = await this.zeroWasteService.addTip(req.body);
            res.status(201).json({ success: true, id: result });
        } catch (error) {
            next(error);
        }
    }
}
