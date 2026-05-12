import { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { usersService } from "./users.service.js";

export const usersController = {
  me: asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  }),

  updateMe: asyncHandler(async (req: Request, res: Response) => {
    const user = await usersService.updateMe(req.user!.id, req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user,
      },
    });
  }),

  updateAvatar: asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Avatar image is required",
      });

      return;
    }

    const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/avatars/${
      req.file.filename
    }`;

    const user = await usersService.updateAvatar(req.user!.id, avatarUrl);

    res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      data: {
        user,
      },
    });
  }),

  deleteMe: asyncHandler(async (req: Request, res: Response) => {
    await usersService.deleteMe(req.user!.id);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  }),

  getAllUsers: asyncHandler(async (req: Request, res: Response) => {
    const numberOfUsers = await usersService
      .getAllUsers()
      .then((users) => users.length);
    const users = await usersService.getAllUsers();

    res.status(200).json({
      success: true,
      data: {
        numberOfUsers,
        users,
      },
    });
  }),

  deleteUser: asyncHandler(async (req: Request, res: Response) => {
    await usersService.deleteUser(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  }),
};
