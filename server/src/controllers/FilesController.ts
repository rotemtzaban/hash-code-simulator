import { Response, Request } from "express";

class FilesController {
    public static downloadQuestion = async (req: Request, res: Response) => {
        const fileName = req.params.year + "/qualification_task.pdf";
        const filePath = "Assets/" + fileName;

        res.download(filePath, fileName);
    }

    public static downloadInputs = async (req: Request, res: Response) => {
        const zipFileName = req.params.year + "/inputs.zip";
        const filePath = "Assets/" + zipFileName;

        res.download(filePath, zipFileName);
    }
}

export default FilesController;
