﻿using Microsoft.EntityFrameworkCore;
using NotesRepository.Data;
using NotesRepository.Data.Models;

namespace NotesRepository.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly IDbContextFactory<ApplicationDbContext> _factory;

        public EventRepository(IDbContextFactory<ApplicationDbContext> factory)
        {
            _factory = factory;
        }

        /// <summary>
        /// Adds a calendar event to the database
        /// </summary>
        /// <param name="calendarEvent">The event object</param>
        /// <returns>True when event was successfully added if not - false</returns>
        public async Task<bool> AddEventAsync(Event calendarEvent)
        {
            using (var ctx = _factory.CreateDbContext())
            {
                await ctx.Events.AddAsync(calendarEvent);
                var result = await ctx.SaveChangesAsync();
                return result > 0;
            }
        }

        /// <summary>
        /// Delete a calendar event from the database
        /// </summary>
        /// <param name="calendarEvent">A event object</param>
        /// <returns>True when event was successfully deletet from database, if not - false</returns>
        public async Task<bool> DeleteEventAsync(Event calendarEvent)
        {
            using (var ctx = _factory.CreateDbContext())
            {
                ctx.Events.Remove(calendarEvent);
                var result = await ctx.SaveChangesAsync();
                return result > 0;
            }
        }

        /// <summary>
        /// Delete more events from the database
        /// </summary>
        /// <param name="events">Events o delete</param>
        /// <returns>True when events were successfully delete</returns>
        public async Task<bool> DeleteEventsAsync(ICollection<Event> events)
        {
            using (var ctx = _factory.CreateDbContext())
            {
                ctx.Events.RemoveRange(events);
                var result = await ctx.SaveChangesAsync();
                return result > 0;
            }
        }

        /// <summary>
        /// Delete a calendar event from the database by id
        /// </summary>
        /// <param name="eventId">Evet id</param>
        /// <returns>True when event was successfully deletet from database, if not - false</returns>
        public async Task<bool> DeleteEventByIdAsync(Guid eventId)
        {
            using (var ctx = _factory.CreateDbContext())
            {
                var evet = await ctx.Events.FirstOrDefaultAsync(x => x.EventId == eventId);
                if (evet is not null)
                {
                    ctx.Events.Remove(evet);
                    var result = await ctx.SaveChangesAsync();
                    return result > 0;
                }
                return false;
            }
        }

        /// <summary>
        /// Gets all events from the database
        /// </summary>
        /// <returns>A collection of events stored in the database</returns>
        public async Task<ICollection<Event>> GetAllEventsAsync()
        {
            using (var ctx = _factory.CreateDbContext())
            {
                return await ctx.Events
                    .Include(n => n.Note)
                    .Include(u => u.User)
                    .ToListAsync();
            }
        }

        /// <summary>
        /// Gets all user's events from the database
        /// </summary>
        /// <param name="userId">User id</param>
        /// <returns>A collection of user's events stored in the database</returns>
        public async Task<ICollection<Event>> GetAllUserEventsAsync(string userId)
        {
            using (var ctx = _factory.CreateDbContext())
            {
                return await ctx.Events
                    .Where(e => e.User.Id == userId)
                    .Include(n => n.Note)
                    .Include(u => u.User)
                    .ToListAsync();
            }
        }

        /// <summary>
        /// Gets the event from the database by id
        /// </summary>
        /// <param name="eventId">Event id</param>
        /// <returns>A event if it exists in the database-otherwise null</returns>
        public async Task<Event?> GetEventByIdAsync(Guid eventId)
        {
            using (var ctx = _factory.CreateDbContext())
            {
                return await ctx.Events
                    .Where(i => i.EventId == eventId)
                    .Include(n => n.Note)
                    .Include(u => u.User)
                    .FirstOrDefaultAsync();
            }
        }

        /// <summary>
        /// Gets the events from the database which has a pattern in their content
        /// </summary>
        /// <param name="content">Pattern to search in content</param>
        /// <returns>A collection of events which has a pattern in their content</returns>
        public async Task<ICollection<Event>> GetEventsByContentAsync(string content)
        {
            using (var ctx = _factory.CreateDbContext())
            {
                return await ctx.Events
                    .Where(e => e.Content.Contains(content))
                    .Include(n => n.Note)
                    .Include(u => u.User)
                    .ToListAsync();
            }
        }

        /// <summary>
        /// Gets the events from the database by date
        /// </summary>
        /// <param name="date">Date</param>
        /// <returns>A collection of events which start at given day stored in the database</returns>
        public async Task<ICollection<Event>> GetEventsByDateAsync(DateTime date)
        {
            using (var ctx = _factory.CreateDbContext())
            {
                return await ctx.Events
                    .Where(e => e.StartAt == date)
                    .Include(n => n.Note)
                    .Include(u => u.User)
                    .ToListAsync();
            }
        }

        /// <summary>
        /// Updates calendar event in the database
        /// </summary>
        /// <param name="calendarEvent">Event object</param>
        /// <returns>True if note was successfully updated</returns>
        public async Task<bool> UpdateEventAsync(Event calendarEvent)
        {
            using (var ctx = _factory.CreateDbContext())
            {
                ctx.Events.Update(calendarEvent);
                var result = await ctx.SaveChangesAsync();
                return result > 0;
            }
        }
    }
}