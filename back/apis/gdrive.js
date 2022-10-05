// @ts-check-ignore

const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const SERVICE_ACCOUNT =
  path.join(__dirname, "..", "config/") + process.env.GDRIVE_SA;
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const ROOT_FOLDER = process.env.ROOT_FOLDER;

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT,
  scopes: SCOPES,
});
const service = google.drive({ version: "v3", auth });

// Create and upload file to google drive
async function uploadFile(name, buffer, parents = [ROOT_FOLDER]) {
  const fileMetadata = {
    name,
    parents,
  };

  const media = {
    body: fs.createReadStream(buffer),
  };
  try {
    const file = await service.files.create({
      resource: fileMetadata,
      media,
      fields: "webContentLink, webViewLink, id",
    });

    return {
      id: file.data.id,
      link: file.data.webViewLink,
      name: fileMetadata.name,
    };
  } catch (error) {
    throw error;
  }
}

// Create a folder to google drive
async function createFolder(name, parents = [ROOT_FOLDER]) {
  const fileMetadata = {
    name: name,
    parents: parents,
    mimeType: "application/vnd.google-apps.folder",
  };

  try {
    const file = await service.files.create({
      resource: fileMetadata,
      fields: "webContentLink, webViewLink, id",
    });

    await service.permissions.create({
      resource: {
        type: "anyone",
        role: "reader",
      },
      fileId: file.data.id,
    });

    return { id: file.data.id, name };
  } catch (error) {
    throw error;
  }
}

// Delete a file in google drive
async function deleteFile(fileId) {
  try {
    const file = await service.files.delete({
      fileId,
    });
    return { ok: true };
  } catch (error) {
    throw error;
  }
}

async function searchFolder(name, parents = [ROOT_FOLDER]) {
  try {
    const res = await service.files.list({
      q: `mimeType = 'application/vnd.google-apps.folder' and name='${name}'`,
      fields: "nextPageToken, files(id, name)",
      spaces: "drive",
    });

    let folder = res.data.files[0];
    if (!folder) {
      const newFolder = await createFolder(name, parents);
      return newFolder;
    }

    return { name: folder.name, id: folder.id };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  uploadFile,
  deleteFile,
  createFolder,
  searchFolder,
};
