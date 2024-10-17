const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    stock_id:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    logoUrl:{
        type:String,
        require:true,
    },
    stockCost:{
        type:String,
        require:true
    },
    stockCostPerRate:{
        type:String,
        require:true
    },
    performance:{
        todayLow:{
            type:String,
            require:true
        },
        todayHigh:{
            type:String,
            require:true
        },
        FTW_low:{
            type:String,
            require:true
        },
        FTW_high:{
            type:String,
            require:true
        },
        open:{
            type:String,
            require:true
        },
        close:{
            type:String,
            require:true
        },
        volume:{
            type:String,
            require:true
        },
        totalTradeValue:{
            type:String,
            require:true
        },
        upperCircuit:{
            type:String,
            require:true
        },
        lowerCircuit:{
            type:String,
            require:true
        },
    },
    fundamentals:{
        marketCap:{
            type:String,
            require:true
        },
        ROE:{
            type:String,
            require:true 
        },
        PE_ratio:{
            type:String,
            require:true
        },
        EPS:{
            type:String,
            require:true
        },
        PB_ratio:{
            type:String,
            require:true
        },
        dividendYield:{
            type:String,
            require:true
        },
        Industry:{
            type:String,
            require:true
        },
        bookValue:{
            type:String,
            require:true
        },
        debtToEquity:{
            type:String,
            require:true
        },
        faceValue:{
            type:String,
            require:true
        },
    },
    financial:{
        revenueGraph:{
            quarterly:{
                graph1:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph2:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph3:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph4:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph5:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                }
            },
            yearly:{
                graph1:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph2:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph3:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph4:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph5:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                }
            }    
        },
        profitGraph:{
            quarterly:{
                graph1:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph2:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph3:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph4:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph5:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                }
            },
            yearly:{
                graph1:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph2:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph3:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph4:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph5:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                }
            }
        },
        netWorthGraph:{
            quarterly:{
                graph1:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph2:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph3:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph4:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph5:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                }
            },
            yearly:{
                graph1:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph2:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph3:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph4:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                },
                graph5:{
                    rateInCr:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    graphPercent:{
                        type:String,
                        require:true
                    }
                }
            }    
        }
    },
    shareHolderPattern:{
        Day1:{
            date:{
                type:String,
                require:true
            },
            promotersPercent:{
                type:String,
                require:true
            },
            retailAndOtherPercent:{
                type:String,
                require:true
            },
            otherDomesticIndustryPercent:{
                type:String,
                require:true
            }
        },
        Day2:{
            date:{
                type:String,
                require:true
            },
            promotersPercent:{
                type:String,
                require:true
            },
            retailAndOtherPercent:{
                type:String,
                require:true
            },
            otherDomesticIndustryPercent:{
                type:String,
                require:true
            }
        },
        Day3:{
            date:{
                type:String,
                require:true
            },
            promotersPercent:{
                type:String,
                require:true
            },
            retailAndOtherPercent:{
                type:String,
                require:true
            },
            otherDomesticIndustryPercent:{
                type:String,
                require:true
            }
        },
        Day4:{
            promotersPercent:{
                type:String,
                require:true
            },
            retailAndOtherPercent:{
                type:String,
                require:true
            },
            otherDomesticIndustryPercent:{
                type:String,
                require:true
            }
        }
    }
})

const stockModel = mongoose.model('stockData',stockSchema);

module.exports = stockModel;