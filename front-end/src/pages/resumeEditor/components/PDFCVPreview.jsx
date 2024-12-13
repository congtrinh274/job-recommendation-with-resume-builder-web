import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PDFCVPreview = ({ sections, themeColor, font, spacing }) => {
    const styles = StyleSheet.create({
        page: {
            padding: 30,
            fontFamily: font,
            fontWeight: 'bold',
            lineHeight: spacing,
            backgroundColor: 'white',
        },
        sectionTitle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: themeColor,
        },
        sectionContent: {
            fontSize: 12,
        },
        text: {
            paddingBottom: 10,
        },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {sections.map((section, idx) => (
                    <View key={`section-${idx}`}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>

                        {section?.content?.map((content, cidx) => (
                            <Text key={`content-${cidx}`} style={styles.sectionContent}>
                                {content}
                            </Text>
                        ))}
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default PDFCVPreview;
