/**
 cpprefjpからリファレンスのhtmlを引っ張ってくる
 */

function getChildren(folder, fullFolderPath, folderTitle, pages)
{
  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    if (!page)
      continue;

    var newFolder = null;
    try {
      newFolder = DocsList.getFolder(fullFolderPath);
    }
    catch (e) {
      newFolder = folder.createFolder(folderTitle);
    }
    
    var title = page.getName();
    newFolder.createFile(title + '.html', page.getHtmlContent());
    getChildren(newFolder, fullFolderPath + '/' + title, title, page.getChildren());
  }
}

function downloadCpprefjp() {
  var domain = '';
  var site = 'cpprefjp';

  var site = SitesApp.getSite(domain, site);
  
  var child = site.getChildByName("reference");
  var pages = child.getChildren();

  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
 
    // Google Driveにhtmlを保存する
    var folder = DocsList.getFolder('cpprefjp');
    if (!folder) {
      folder = DocsList.createFolder('cpprefjp');
    }
    var title = page.getName();
    folder.createFile(title + '.html', page.getHtmlContent());

    // 再帰的に引っ張ってくる    
    getChildren(folder, 'cpprefjp/' + title, title, page.getChildren());
  }
};
