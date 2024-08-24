package org.example.backend.services;

import org.slf4j.*;

public class LoggerService {
    Logger logger = LoggerFactory.getLogger(LoggerService.class);

    public void info(String a) {
        logger.info(a);
    }

    public void error(String err) {
        logger.error(err);
    }
}
