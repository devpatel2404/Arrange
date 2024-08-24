package org.example.backend.services;

import com.nylas.*;

import java.util.*;

public class CalendarService {

    private final NylasClient nylasClient;

    public CalendarService(NylasClient nylasClient) {
        this.nylasClient = nylasClient;
    }

    public List<Calendar> getCalendars() {
        return nylasClient.calendars().
    }
}
