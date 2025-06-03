
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  Search, 
  FileText, 
  Image, 
  Film, 
  Archive,
  Music
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video' | 'archive' | 'audio';
  size: string;
  uploadDate: string;
  downloads: number;
  url: string;
}

const FileManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'volcanic-landscape.png',
      type: 'image',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      downloads: 45,
      url: '/lovable-uploads/31f0803c-706f-4424-8df0-4a511674eeba.png'
    },
    {
      id: '2',
      name: 'hellish-terrain.png',
      type: 'image',
      size: '3.1 MB',
      uploadDate: '2024-01-14',
      downloads: 32,
      url: '/lovable-uploads/f62ca559-4768-440a-964b-cd9ca4364f57.png'
    },
    {
      id: '3',
      name: 'inferno-landscape.png',
      type: 'image',
      size: '2.8 MB',
      uploadDate: '2024-01-13',
      downloads: 67,
      url: '/lovable-uploads/345119e5-c5ee-4a85-b0c1-4bdf4c35af0a.png'
    },
    {
      id: '4',
      name: 'hellish-valley.png',
      type: 'image',
      size: '2.2 MB',
      uploadDate: '2024-01-12',
      downloads: 23,
      url: '/lovable-uploads/c00a8631-95e8-4006-a1f8-7c90e36434e6.png'
    },
    {
      id: '5',
      name: 'devil-workspace.png',
      type: 'image',
      size: '1.9 MB',
      uploadDate: '2024-01-11',
      downloads: 89,
      url: '/lovable-uploads/34e5d3d8-8381-44f4-8e75-66ce84cc582f.png'
    },
    {
      id: '6',
      name: 'hells-logo.png',
      type: 'image',
      size: '234 KB',
      uploadDate: '2024-01-10',
      downloads: 156,
      url: '/lovable-uploads/1b6ff5e7-e9fb-45ea-8881-7237c61db4e3.png'
    }
  ]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-4 w-4 text-inferno-500" />;
      case 'document':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'video':
        return <Film className="h-4 w-4 text-purple-500" />;
      case 'archive':
        return <Archive className="h-4 w-4 text-yellow-500" />;
      case 'audio':
        return <Music className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = () => {
    // Placeholder for file upload functionality
    console.log('File upload triggered');
  };

  const handleDeleteFile = (fileId: string) => {
    setFiles(files.filter(file => file.id !== fileId));
  };

  const handleViewFile = (url: string) => {
    window.open(url, '_blank');
  };

  const handleDownloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* File Manager Header */}
      <Card className="border-inferno-800/30">
        <CardHeader>
          <CardTitle className="text-inferno-500">Datei-Verwaltung</CardTitle>
          <CardDescription>
            Zentrale Verwaltung aller digitalen Assets und Produkte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-volcanic-500" />
                <Input
                  placeholder="Dateien durchsuchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-inferno-800/30"
                />
              </div>
            </div>
            <Button onClick={handleFileUpload} className="lava-button text-white">
              <Upload className="h-4 w-4 mr-2" />
              Datei hochladen
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-inferno-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-volcanic-600">
              Gesamt-Speicher
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-inferno-500">2.3 GB</div>
            <div className="w-full bg-volcanic-200 rounded-full h-2 mt-2">
              <div className="bg-inferno-500 h-2 rounded-full" style={{ width: '23%' }}></div>
            </div>
            <p className="text-xs text-volcanic-500 mt-1">von 10 GB verwendet</p>
          </CardContent>
        </Card>

        <Card className="border-inferno-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-volcanic-600">
              Datei-Anzahl
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-inferno-500">{files.length}</div>
            <p className="text-xs text-volcanic-500">Dateien gespeichert</p>
          </CardContent>
        </Card>

        <Card className="border-inferno-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-volcanic-600">
              Downloads heute
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-inferno-500">42</div>
            <p className="text-xs text-volcanic-500">+15% vs. gestern</p>
          </CardContent>
        </Card>
      </div>

      {/* Files Table */}
      <Card className="border-inferno-800/30">
        <CardHeader>
          <CardTitle className="text-inferno-500">Alle Dateien</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datei</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Größe</TableHead>
                <TableHead>Upload-Datum</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <span className="font-medium text-volcanic-700">{file.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize text-volcanic-600">{file.type}</span>
                  </TableCell>
                  <TableCell className="text-volcanic-600">{file.size}</TableCell>
                  <TableCell className="text-volcanic-600">{file.uploadDate}</TableCell>
                  <TableCell className="text-volcanic-600">{file.downloads}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewFile(file.url)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadFile(file.url, file.name)}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFile(file.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileManager;
