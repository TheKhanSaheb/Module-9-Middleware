import { type Request, type Response } from "express";
import { profileService } from "./profile.service";
const createProfile = async (req: Request, res: Response) => {

    try
    {
        const result = await profileService.createProfileInDB(req.body);
    
        res.status(201).json({
            message: 'Profile created successfully',
            data: result.rows[0]
        });
    }

        catch (error) {
            console.error('Error creating profile:', error)
            res.status(500).json({
                error: 'Internal Server Error',
                data: error
            })
        }


}

export const profileController = {
    createProfile
}