﻿using NotesRepository.Data.Models;
using Directory = NotesRepository.Data.Models.Directory;

namespace NotesRepository.Repositories.Interfaces
{
    public interface IDirectoryRepository : IRepository<Directory>
    {
        Task<Directory?> GetDirectoryByNameAsync(string name, string userId);
        Task<ICollection<Directory>> GetAllDirectoriesForParticularUserAsync(string userId);
        Task<ICollection<Directory>?> GetAllSubDirectoriesOfParticularDirectory(Guid directoryId);
        Task<ICollection<Directory>?> GetAllDirectoriesWithoutParentDirectoryForParticularUserAsync(string userId);
        Task<bool> ChangeParentDirectoryForSubDirectory(Guid subDirectoryId, Guid directoryId);
        Task<bool> DeleteManyAsync(ICollection<Directory> directories);
        Task<bool> DeleteAllSubDirectoriesForParticularDirectoryAsync(Guid directoryId);
        Task<bool> MarkDirectoryAsDeletedAsync(Guid directoryId);
        Task<bool> MarkDirectoryAsNotDeletedAsync(Guid directoryId);

    }
}


    
